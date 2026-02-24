<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AvailablePosition;
use App\Models\JobApplyPosition;
use App\Models\JobApplyUser;
use App\Models\JobVacancies;
use App\Models\User;
use App\Models\Validation;
use Illuminate\Http\Request;

use function PHPSTORM_META\map;

class JobController extends Controller
{
    function get(){
        $vacancies = JobVacancies::all();

        $vacancies = $vacancies->map(function($vacancy){
            $positions = AvailablePosition::where('job_vacancy_id', $vacancy->id)->get();

            return[
                "id"=>$vacancy->id,
                "category"=>[
                    'id'=>$vacancy->category->id,
                    'name'=>$vacancy->category->name,
                ],
                "company"=>$vacancy->company,
                "address"=>$vacancy->address,
                "description"=>$vacancy->description,
                "available_position"=>$positions->map(function ( $position) {
                    return[
                        'position'=>$position->position,
                        'capacity'=>$position->capacity,
                        'apply_capacity'=>$position->total_capacity,
                    ];
                })->toArray()
            ];
        })->toArray();

        return response()->json([
            'Headers'=>[
                'Response code'=>200
            ],
            "Body"=>[
                "vacancies"=>$vacancies
            ]
        ]);
    }

    function show(string $id){
        $vacancy = JobVacancies::where('id', $id)->first();
        $positions = AvailablePosition::where('job_vacancy_id', $vacancy->id)->get();

        return response()->json([
            'Headers'=>[
                'Response code'=>200
            ],
            'Body'=>[
                "vacancy"=>[
                    "id"=>$vacancy->id,
                "category"=>[
                    'id'=>$vacancy->category->id,
                    'name'=>$vacancy->category->name,
                ],
                "company"=>$vacancy->company,
                "address"=>$vacancy->address,
                "description"=>$vacancy->description,
                "available_position"=>$positions->map(function ( $position) {
                    return[
                        'position'=>$position->position,
                        'capacity'=>$position->capacity,
                        'apply_capacity'=>$position->total_capacity,
                    ];
                })->toArray()
                ]
            ]
        ]);
    }

    function post(Request $request){
        $clientData = $request->validate([
            'job_vacancy_id'=>'required',
            'position'=>'array|required',
            'notes'=>'nullable'
        ]);
        
        $user = User::where('token',$request->bearerToken())->first();
        // Check validation
        $validation = Validation::where('user_id', $user->id)->first();
        if($validation->status === 'pending'){
            return response()->json([
                "Header"=>[
                    "Response code"=>401
                ],
                "Body"=>[
                    "message"=>"Your data validation must be accepted by validator before",
                ]
            ], 401);
        }
        
        $application = JobApplyUser::where('user_id', $user->id)->first();
        if($application){
            return response()->json([
                "Header"=>[
                    "Response code"=>401
                ],
                "Body"=>[
                    "message"=>"Application for a job can only be once",
                ]
            ], 401);
        }


        $clientData['date']= date("Y-m-d");
        $clientData['user_id']= $user->id;
        $jobaply = JobApplyUser::create($clientData);
        $clientData['job_apply_user_id'] = $jobaply->id;
        
        foreach ($clientData['position'] as $id) {
            $clientData['available_position_id'] = $id;
            JobApplyPosition::create($clientData);
        };
        
        return response()->json([
            "Header"=>[
                "Response code"=>200
            ],
            "Body"=>[
                "message"=>"Applying for job successfull",
            ]
        ], 200);



    }

    function getApply(Request $request){
        $user = User::where('token',$request->bearerToken())->first();
        $application = JobApplyUser::where('user_id', $user->id)->first();
        $position = JobApplyPosition::where('user_id', $user->id)->get();


        return response()->json([
            "Header"=>[
                "Response code"=>200
            ],
            "Body"=>[
                "vacancies"=>[
                    "id" => $application->id,
                    "category"=>[
                        "id" => $application->vacancy->category->id,
                        "job_category" => $application->vacancy->category->name,
                    ],
                    "company"=>$application->vacancy->company,
                    "address"=>$application->vacancy->address,
                    "position"=>$position->map(function ( $posisi) use ($application) {
                        return[
                            'position' => $posisi->available_position->position,
                            'status' => $posisi->status,
                            'notes' => $application->notes
                        ];
                    })->toArray()
                ]
            ]
        ]);
    }
}
