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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->integer('pax');
            $table->string('status');
            $table->integer('totalPrice')->nullable();
            $table->date('date');
            $table->time('time');
            $table->string('location');
            $table->text('description');
            $table->string('coverPhoto')->nullable();
            $table->foreignId('package_id')->constrained('packages')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');  
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('events');
    }
};
