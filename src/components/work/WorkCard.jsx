import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const WorkCard = ({post}) => {
    return (
        <Link
            href={`/work/${post.slug}`}
            className="work-card relative overflow-hidden group block min-w-[300px] md:min-w-[400px]"
        >
            <div className="absolute -top-8 left-0 overflow-hidden z-10">
                <span className="inline-block origin-left translate-y-full rotate-10 group-hover:translate-y-0 group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-white text-sm md:text-base tracking-wide">
                    {post.title}
                </span>
            </div>

            <div className="relative w-full aspect-square overflow-hidden bg-neutral-900">
                {post.video ? (
                    <video
                        src={post.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : null}
                <Image
                    width={1000}
                    height={1000}
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
            </div>
        </Link>
    )
}

export default WorkCard