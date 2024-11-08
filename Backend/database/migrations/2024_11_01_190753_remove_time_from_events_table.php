<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveTimeFromEventsTable extends Migration
{
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('time'); // Remove the time column
        });
    }

    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('time')->nullable(); // Restore the time column if needed
        });
    }
}
