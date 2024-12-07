<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

use Coderflex\LaravelTicket\Models\Message;
class Ticket extends \Coderflex\LaravelTicket\Models\Ticket implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    public function getRelatedTickets()
    {
        return static::query()
            ->whereHas('categories', function ($query) {
                $query->whereIn('id', $this->categories->pluck('id'));
            })
            ->where('status', 'open')
            ->where('id', '!=', $this->id)
            ->latest()
            ->take(3)
            ->get();
    }

    public function assignedUser()
    {
        return $this->belongsTo(Admins::class, 'assigned_to');
    }
}