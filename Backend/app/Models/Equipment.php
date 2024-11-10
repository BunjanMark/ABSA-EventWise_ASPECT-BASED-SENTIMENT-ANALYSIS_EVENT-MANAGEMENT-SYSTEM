<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    // Optionally define the table name if it doesn't follow the convention
    protected $table = 'equipments'; // Make sure this matches the plural table name

    protected $fillable = ['item', 'number_of_items', 'number_of_sort_items', 'status', 'event_id'];

    // Relationship: Equipment belongs to an event
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
