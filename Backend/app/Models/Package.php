<?php

// app/Models/Package.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $table = 'packages';

    protected $fillable = [
        'packageName',
        'eventType',
        'services',
        'totalPrice',
        'coverPhoto',
        'packageCreatedDate',
    ];

    protected $casts = [
        'services' => 'array',
    ];
}
