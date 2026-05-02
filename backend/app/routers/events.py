from fastapi import APIRouter, HTTPException
from app.db import get_supabase
from app.models.schemas import Event, EventCreate, EventUpdate

router = APIRouter(prefix="/events", tags=["events"])


@router.get("", response_model=list[Event])
async def list_events(
    event_type: str | None = None,
    upcoming_only: bool = True,
    active_only: bool = True,
):
    query = get_supabase().table("events").select("*")
    if active_only:
        query = query.eq("is_active", True)
    if event_type:
        query = query.eq("event_type", event_type)
    if upcoming_only:
        from datetime import date
        query = query.gte("date", date.today().isoformat())
    result = query.order("date", desc=False).execute()
    return result.data


@router.get("/{slug}", response_model=Event)
async def get_event(slug: str):
    result = (
        get_supabase().table("events").select("*").eq("slug", slug).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Event not found")
    return result.data[0]


@router.post("", response_model=Event, status_code=201)
async def create_event(event: EventCreate):
    data = event.model_dump(exclude_none=True)
    result = get_supabase().table("events").insert(data).execute()
    return result.data[0]


@router.patch("/{event_id}", response_model=Event)
async def update_event(event_id: str, updates: EventUpdate):
    data = updates.model_dump(exclude_none=True)
    result = (
        get_supabase().table("events").update(data).eq("id", event_id).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Event not found")
    return result.data[0]
