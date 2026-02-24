<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplyPosition extends Model
{
    protected $fillable = ['date', 'user_id', 'job_vacancy_id', 'available_position_id', 'job_apply_user_id', 'status'];

    function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    function job_vacancy(){
        return $this->belongsTo(JobVacancies::class, 'job_vacancy_id');
    }
    function available_position(){
        return $this->belongsTo(AvailablePosition::class, 'available_position_id');
    }
    function job_apply_user(){
        return $this->belongsTo(JobApplyUser::class, 'job_apply_user_id');
    }
}
