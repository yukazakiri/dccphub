<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedbacks extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';
    protected $fillable = ['type', 'message', 'user_info', 'reviewed'];

    protected $casts = [
        'user_info' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_info->user_id');
    }

}
