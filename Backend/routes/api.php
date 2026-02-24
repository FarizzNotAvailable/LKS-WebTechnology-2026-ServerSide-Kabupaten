<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ValidationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('/v1')->group(function(){
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function(){
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/validation', [ValidationController::class, 'getCategory']);
        Route::post('/validation', [ValidationController::class, 'post']);
        Route::get('/validations', [ValidationController::class, 'get']);
        Route::get('job_vacancies',[JobController::class, 'get']);
        Route::get('job_vacancies/{id}',[JobController::class, 'show']);
        Route::post('/applications', [JobController::class, 'post']);
        Route::get('/applications', [JobController::class, 'getApply']);
    });
});
