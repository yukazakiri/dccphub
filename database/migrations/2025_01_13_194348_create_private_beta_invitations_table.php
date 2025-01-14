<?php
// database/migrations/XXXX_create_private_beta_invitations_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('private_beta_invitations', function (Blueprint $table) {
            $table->id();

            $table->string('email')->index();
            $table->string('status', 16)->index()->default('pending')
                ->comment('pending|waiting|active|archived');
            $table->string('access_code', 32)->index()
                ->comment('the code that users (testers) will receive and must enter to access the app');
            $table->timestamp('expire_at')->nullable();
            $table->unsignedInteger('num_requests')->default(0);
            $table->timestamp('last_access_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('private_beta_invitations');
    }
};
