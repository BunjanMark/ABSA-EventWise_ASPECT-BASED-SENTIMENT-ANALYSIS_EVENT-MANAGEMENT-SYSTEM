<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Inventory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Guests;
use App\Models\Package;
use App\Models\User;
use App\Models\Equipment;
use Illuminate\Database\Eloquent\SoftDeletes;
class Event extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name', 
        'type', 
        'pax',
        'status',
        'date', 
        'totalPrice',
        'time', 
        'location', 
        'description', 
        'coverPhoto',
        'packages',
        'user_id',
        'archived', 
    ];
    protected $dates = ['deleted_at']; // To track soft delete timestamps
    // Relationship to guests
    public function guests()
{
    return $this->hasMany(Guests::class, 'event_id');
}

    public function package()
{
    return $this->belongsTo(Package::class);
}
 
 
    // Relationship to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
        public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }

        public function inventories()
    {
        return $this->belongsToMany(Inventory::class);
    }
}
