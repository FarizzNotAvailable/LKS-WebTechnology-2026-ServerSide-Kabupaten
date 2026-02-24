<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobVacancies extends Model
{
    protected $fillable = ['job_category_id', 'company', 'address', 'description'];

    function category(){
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }
    
}
