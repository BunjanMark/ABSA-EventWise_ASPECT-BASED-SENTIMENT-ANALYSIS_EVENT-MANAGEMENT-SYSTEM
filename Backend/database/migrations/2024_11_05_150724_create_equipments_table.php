<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('equipments', function (Blueprint $table) {
            $table->id(); // Laravel default primary key (id)
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade'); // Foreign key to events table
            $table->string('item');
            $table->integer('number_of_items');
            $table->integer('number_of_sort_items');
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('equipments');
    }
};
