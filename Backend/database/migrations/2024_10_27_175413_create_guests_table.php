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
            $table->string('GuestName');
            // $table->string('email')->unique();
            $table->string('email');
            $table->string('phone');
            $table->string('role');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guests');
    }

   
};
