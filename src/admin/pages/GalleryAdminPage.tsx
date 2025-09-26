import { useEffect, useState } from 'react'
import { apiFetch, API_BASE_URL } from '../../lib/utils'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'

type GalleryItem = { _id?: string; url: string; caption?: string }

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [urlInput, setUrlInput] = useState('')
  const [caption, setCaption] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await apiFetch(`/gallery?page=${page}&limit=9`)
      if (Array.isArray(data)) {
        // backward compat (no pagination on server)
        setItems(data)
        setPages(1)
      } else {
        setItems(data.items || [])
        setPages(data.pages || 1)
      }
    } catch (e:any) {
      toast.error(e.message || 'Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [page])

  const upload = async () => {
    if (!file) return undefined
    const fd = new FormData(); fd.append('file', file)
    const { url } = await uploadWithProgress(`${API_BASE_URL}/upload`, fd, setProgress)
    return url as string
  }

  const uploadBulk = async (): Promise<string[] | undefined> => {
    if (!files.length) return undefined
    const fd = new FormData(); files.forEach(f=>fd.append('files', f))
    const { urls } = await uploadWithProgress(`${API_BASE_URL}/upload/bulk`, fd, setProgress)
    return urls as string[]
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setUploading(true)
      setProgress(0)
      // Priority: multiple files, else single file/url
      const bulkUrls = await uploadBulk()
      if (bulkUrls && bulkUrls.length) {
        for (const u of bulkUrls) {
          await apiFetch('/gallery', { method: 'POST', body: JSON.stringify({ url: u, caption: caption.trim() }) })
        }
        toast.success(`Added ${bulkUrls.length} images`)
        setFiles([])
      } else {
        const finalUrl = urlInput.trim() ? urlInput.trim() : await upload()
        if (!finalUrl) throw new Error('Please upload a file or provide an image URL')
        await apiFetch('/gallery', { method: 'POST', body: JSON.stringify({ url: finalUrl, caption: caption.trim() }) })
        toast.success('Image added')
      }
      setFile(null); setUrlInput(''); setCaption('')
      await load()
    } catch (e:any) {
      toast.error(e.message || 'Failed to add image')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  // Helper: XMLHttpRequest with progress reporting
  const uploadWithProgress = (url: string, formData: FormData, onProgress?: (p: number)=>void): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url)
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try { resolve(JSON.parse(xhr.responseText)) } catch { resolve({}) }
        } else {
          reject(new Error(xhr.responseText || `Upload failed: ${xhr.status}`))
        }
      }
      xhr.onerror = () => reject(new Error('Network error'))
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable && onProgress) {
          const pct = Math.round((evt.loaded / evt.total) * 100)
          onProgress(pct)
        }
      }
      xhr.send(formData)
    })
  }

  const remove = async (id?: string) => {
    if (!id) return
    if (!confirm('Delete this image?')) return
    await apiFetch(`/gallery/${id}`, { method: 'DELETE' })
    toast.success('Deleted')
    await load()
  }

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-4">Gallery</h2>
      <Card className="mb-6 grid md:grid-cols-4 gap-3">
        <Input type="file" accept="image/*" onChange={e=>setFile((e.target as HTMLInputElement).files?.[0]||null)} />
        <Input type="file" multiple accept="image/*" onChange={e=>setFiles(Array.from((e.target as HTMLInputElement).files||[]))} />
        <Input placeholder="Or paste image URL" value={urlInput} onChange={e=>setUrlInput(e.target.value)} />
        <Input placeholder="Caption (optional)" value={caption} onChange={e=>setCaption(e.target.value)} />
        <div className="md:col-span-4">
          <Button disabled={uploading} onClick={submit as any}>
            {uploading ? 'Uploading…' : 'Add Image'}
          </Button>
          {uploading && (
            <div className="mt-3">
              <div className="h-2 w-full bg-gray-200 rounded">
                <div className="h-2 bg-blue-500 rounded transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-xs text-gray-600 mt-1">{progress}%</div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({length:9}).map((_,i)=> (
              <div key={i} className="rounded-xl h-40 bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((g)=> (
              <div key={g._id} className="border rounded-xl overflow-hidden">
                {(() => {
                  const origin = (() => { try { return new URL(API_BASE_URL).origin } catch { return 'http://localhost:4000' } })()
                  const src = /^https?:\/\//i.test(g.url) ? g.url : g.url?.startsWith('/uploads/') ? `${origin}${g.url}` : g.url
                  return <img src={src} alt={g.caption||'Image'} className="w-full h-48 object-cover" />
                })()}
                <div className="p-3 flex items-center justify-between">
                  <div className="text-sm text-gray-700 truncate max-w-[70%]">{g.caption||'Untitled'}</div>
                  <button onClick={()=>remove(g._id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-4">
          <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-2 rounded-lg bg-gray-100 disabled:opacity-50">Prev</button>
          <div className="text-sm text-gray-600">Page {page} of {pages}</div>
          <button disabled={page>=pages} onClick={()=>setPage(p=>Math.min(pages,p+1))} className="px-3 py-2 rounded-lg bg-gray-100 disabled:opacity-50">Next</button>
        </div>
      </Card>
    </div>
  )
}


