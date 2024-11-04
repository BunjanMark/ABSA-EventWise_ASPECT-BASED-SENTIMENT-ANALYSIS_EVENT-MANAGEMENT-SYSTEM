<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccountRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table("account_roles")->insert([
            "user_id" => 1,
            "role_id" => 1,
            "service_provider_name" => "food catering",
            "description" => "Admin",
        ]);

        DB::table("account_roles")->insert([
            "user_id" => 1,
            "role_id" => 2,
            "service_provider_name" => "photographer",
            "description" => "responsible for taking pictures",
        ]);
    }
}
