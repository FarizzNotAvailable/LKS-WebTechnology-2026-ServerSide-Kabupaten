<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvailablePosition extends Model
{
    protected $fillable = ['job_vacancy_id', 'position', 'capacity', 'total_capacity'];

    function vacancy(){
        return $this->belongsTo(JobVacancies::class, 'job_vacancy_id');
    }
}
