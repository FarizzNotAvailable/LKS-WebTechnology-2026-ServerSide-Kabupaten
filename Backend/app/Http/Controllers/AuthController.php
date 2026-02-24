<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    function login(Request $request){
        $clientData = $request->validate([
            'id_card_number'=> 'required',
            'password'=>'required'
        ]);

        $user = User::where('id_card_number', $clientData['id_card_number'])->first();

        if(!$user||$user->password != $clientData['password']){
            return response()->json([
                'Headers'=>[
                    'Response code'=>401
                ],
                'Body'=>[
                    'message'=>'ID Card Number or Password incorrect'
                ]
            ], 401);
        }

        $token = $user->createToken('token')->plainTextToken;
        $data['token'] = $token;
        $user->update($data);

        return response()->json([
                'Headers'=>[
                    'Response code'=>200
                ],
                'Body'=>[
                    'name'=>$user->name,
                    'born_date'=>$user->born_date,
                    'gender'=>$user->gender,
                    'address'=>$user->address,
                    'token'=>$user->token,
                    'regional'=>[
                        'id' => $user->regional->id,
                        'province' => $user->regional->province,
                        'district' => $user->regional->district,
                    ]
                ]
            ], 200);;
    }
    function logout(Request $request){
        $user = User::where('token', $request->bearerToken())->first();
        $newToken['token'] = null;

        $user->update($newToken);

        return response()->json([
            'Header'=>[
                'Response code'=>200,
            ],
            'Body'=>[
                'Message'=>'Logout Success'
            ]
        ]);
    }
}
