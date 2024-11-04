<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToEventsTable extends Migration
{
    public function up()
{
    Schema::table('events', function (Blueprint $table) {
        $table->time('time'); // Add time column
        $table->string('type'); // Add type column
        $table->binary('cover_photo'); // Use binary for cover photo
    });
}


    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('time'); // Remove time column
            $table->dropColumn('type'); // Remove type column
            $table->dropColumn('cover_photo'); // Remove cover photo column
        });
    }
}
