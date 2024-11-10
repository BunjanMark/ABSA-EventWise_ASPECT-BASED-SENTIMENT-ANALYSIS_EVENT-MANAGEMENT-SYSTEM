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
        Schema::create('guests', function (Blueprint $table) {
            $table->id(); // This will act as GuestID
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('name');
            // $table->string('email')->unique();
            $table->string('email');
            $table->string('phone');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guests');
    }

   
};
