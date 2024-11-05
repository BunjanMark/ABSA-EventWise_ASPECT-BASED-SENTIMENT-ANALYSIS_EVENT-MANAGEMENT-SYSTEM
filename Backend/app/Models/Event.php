<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Guests;
use App\Models\Package;
use App\Models\User;
use App\Models\Equipment;
class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'type', 
        'pax',
        'status',
        'date', 
        'time', 
        'location', 
        'description', 
        'cover_photo',
        'package_id',
        'user_id',
        'archived', 
    ];

    // Relationship to guests
    public function guests()
    {
        return $this->hasMany(Guests::class);
    }

    // Relationship to package
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
}
