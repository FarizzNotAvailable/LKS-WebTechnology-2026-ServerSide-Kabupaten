<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('validations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_category_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->enum('status', ['accepted', 'pending', 'declined'])->default('pending');
            $table->text('work_exp')->nullable();
            $table->text('job_position')->nullable();
            $table->text('reason_accepted')->nullable();
            $table->text('validator_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validations');
    }
};
