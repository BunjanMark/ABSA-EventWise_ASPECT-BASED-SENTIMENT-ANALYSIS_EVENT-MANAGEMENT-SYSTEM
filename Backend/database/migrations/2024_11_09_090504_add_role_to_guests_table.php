<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoleToGuestsTable extends Migration
{
    public function up()
    {
        Schema::table('guests', function (Blueprint $table) {
            $table->string('role')->nullable(); // Add the role column (nullable if you want to allow empty roles)
        });
    }

    public function down()
    {
        Schema::table('guests', function (Blueprint $table) {
            $table->dropColumn('role'); // Rollback the addition of the role column
        });
    }
}
