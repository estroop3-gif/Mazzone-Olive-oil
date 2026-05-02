from fastapi import APIRouter, HTTPException
from app.db import get_supabase
from app.models.schemas import BlogPost, BlogPostCreate, BlogPostUpdate

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("", response_model=list[BlogPost])
async def list_posts(category: str | None = None, published_only: bool = True):
    query = get_supabase().table("blog_posts").select("*")
    if published_only:
        query = query.eq("is_published", True)
    if category:
        query = query.eq("category", category)
    result = query.order("published_at", desc=True).execute()
    return result.data


@router.get("/{slug}", response_model=BlogPost)
async def get_post(slug: str):
    result = (
        get_supabase().table("blog_posts").select("*").eq("slug", slug).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return result.data[0]


@router.post("", response_model=BlogPost, status_code=201)
async def create_post(post: BlogPostCreate):
    from datetime import datetime

    data = post.model_dump(exclude_none=True)
    if post.is_published:
        data["published_at"] = datetime.utcnow().isoformat()
    result = get_supabase().table("blog_posts").insert(data).execute()
    return result.data[0]


@router.patch("/{post_id}", response_model=BlogPost)
async def update_post(post_id: str, updates: BlogPostUpdate):
    from datetime import datetime

    data = updates.model_dump(exclude_none=True)
    if updates.is_published:
        data["published_at"] = datetime.utcnow().isoformat()
    result = (
        get_supabase().table("blog_posts").update(data).eq("id", post_id).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return result.data[0]
