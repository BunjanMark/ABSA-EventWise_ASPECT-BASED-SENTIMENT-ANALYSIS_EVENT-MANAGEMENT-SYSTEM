<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('events')->insert([
            'name' => 'mr and malik wedding',
            'type' => 'Wedding',
            'totalPrice' => 551000.00,
            'pax' => 1000,
            'date' => '2027-08-01',
            'time' => '12:00:00',
            'location' => 'New York, USA',
            'description' => 'A wedding event with a lot of guest, nice place, etc.',
            'status' => 'scheduled',
            'user_id' => 3, // Assuming the user has an id attribute
            'coverPhoto' => '',
            'packages' => json_encode("[1]"),
        ]);

        DB::table('event_packages')->insert([
            'event_id' => 1,
            'package_id' => 1,
        ]);
    }
}
