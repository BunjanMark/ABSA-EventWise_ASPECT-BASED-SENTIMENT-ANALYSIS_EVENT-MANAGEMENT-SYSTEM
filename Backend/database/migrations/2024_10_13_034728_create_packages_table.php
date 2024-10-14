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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('packageName');
            $table->string('eventType');
            $table->json('services');
            $table->decimal('totalPrice', 10, 2);
            $table->string('coverPhoto')->nullable(); // Ensure this is a string and nullable
            $table->date('packageCreatedDate');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('packages');
    }
};
