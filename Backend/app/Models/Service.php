<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Package;

class Service extends Model
{
    use HasFactory;
 

    protected $fillable = [
        'user_id',
        'account_roles_id',
        'serviceName',
        'serviceCategory',
        'basePrice',
        'pax',
        'requirements',
        'availabilityStatus',
    ];

    public function packages()
    {
        return $this->belongsToMany(Package::class);
    }
   
}
