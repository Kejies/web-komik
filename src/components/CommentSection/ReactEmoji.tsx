'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

const emojis = ['😄', '😢', '🔥']

export default function CommentSection({ slug }: { slug: string }) {
    const [comments, setComments] = useState([])
    const [reactions, setReactions] = useState({})
    const [comment, setComment] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await axios.get(`/api/comments/${slug}`)
        setComments(res.data.comments)
        setReactions(res.data.reactions || {})
    }

    const handleReact = async (emoji: string) => {
        await axios.post(`/api/comments/${slug}`, { reaction: emoji })
        fetchData()
    }

    const handleSubmit = async () => {
        if (!comment.trim()) return
        setLoading(true)
        try {
            await axios.post(`/api/comments/${slug}`, { comment, name })
            setComment('')
            setName('')
            fetchData()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-10 bg-gray-900 p-4 rounded">
            <div className="flex gap-2 mb-4">
                {emojis.map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => handleReact(emoji)}
                        className="text-2xl hover:scale-110 transition"
                    >
                        {emoji} {reactions[emoji]?.length || 0}
                    </button>
                ))}
            </div>

            <div className="mb-4">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-2 px-3 py-1 rounded bg-gray-800 text-white"
                    placeholder="Nama kamu"
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                    placeholder="Tulis komentar..."
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {loading ? 'Mengirim...' : 'Kirim'}
                </button>
            </div>

            <div>
                {comments.map((c: any) => (
                    <div key={c.id} className="border-t border-gray-700 py-2 text-white">
                        <p className="text-sm text-gray-400">{c.name} - {new Date(c.time).toLocaleString()}</p>
                        <p>{c.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
