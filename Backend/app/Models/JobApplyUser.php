<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplyUser extends Model
{
    protected $fillable = ['user_id', 'job_vacancy_id', 'notes', 'date'];

    function user(){
        return $this->belongsTo(User::class , 'user_id');
    }
    function vacancy(){
        return $this->belongsTo(JobVacancies::class , 'job_vacancy_id');
    }
}
