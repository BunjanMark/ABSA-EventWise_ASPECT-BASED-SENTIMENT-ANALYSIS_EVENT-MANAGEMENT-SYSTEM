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
    Schema::table('events', function (Blueprint $table) {
        $table->unsignedBigInteger('package_id')->nullable(); // Add package_id column
        $table->foreign('package_id')->references('id')->on('packages')->onDelete('set null'); // Add foreign key constraint
    });
}

    /**
     * Reverse the migrations.
     */
    public function down()
{
    Schema::table('events', function (Blueprint $table) {
        $table->dropForeign(['package_id']); // Drop the foreign key constraint
        $table->dropColumn('package_id'); // Drop the package_id column
    });
}
};
