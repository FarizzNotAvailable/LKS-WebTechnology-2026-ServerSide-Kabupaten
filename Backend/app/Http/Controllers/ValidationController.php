<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobCategory;
use App\Models\User;
use App\Models\Validation;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    function getCategory(){
        $category = JobCategory::all();

        return response()->json([
            'category'=>$category
        ]);
    }
    function post(Request $request){
        $clientData = $request->validate([
            'work_exp'=>'nullable',
            'job_category_id'=>'required',
            'job_position'=>'required',
            'reason_accepted'=>'nullable'
        ]);

        $user = User::where('token', $request->bearerToken())->first();

        $clientData['user_id'] = $user->id;

        Validation::create($clientData);

        return response()->json([
            'Headers'=>[
                    'Response code'=>200
                ],
                'Body'=>[
                    'message'=>'Request data validation sent successfull'
                ]
            ],200);
    }
    function get(Request $request){
        $user = User::where('token', $request->bearerToken())->first();
        $validation = Validation::where('user_id', $user->id)->first();

        return response()->json([
            'Headers'=>[
                    'Response code'=>200
                ],
                'Body'=>[
                    'validation'=>[
                        'id'=>$validation->id,
                        'status'=>$validation->status,
                        'work_exp'=>$validation->work_exp,
                        'job_category'=>$validation->category->name,
                        'job_position'=>$validation->job_position,
                        'reason_accepted'=>$validation->reason_accepted,
                        'validator_notes'=>$validation->validator_notes,
                    ]
                ]
            ],200);
    }
}
