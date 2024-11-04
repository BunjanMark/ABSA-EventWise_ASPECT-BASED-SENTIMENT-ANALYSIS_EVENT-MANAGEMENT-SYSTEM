<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Event;
class Guests extends Model
{
    use HasFactory;

    protected $fillable = [
        'GuestName', 'email', 'phone', 'event_id'
    ];

    // Relationship to event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
