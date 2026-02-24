<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    protected $fillable = ['job_category_id', 'user_id', 'status', 'work_exp', 'job_position', 'reason_accepted', 'validator_notes'];

    function category(){
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }
    function user(){
        return $this->belongsTo(User::class , 'user_id');
    }
}