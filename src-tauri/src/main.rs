// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest;
use serde_json::Value;
use std::sync::Mutex;
use rand::prelude::*;

struct ComicInfo{
    current: Mutex<isize>,
    latest: Mutex<isize>,
}

async fn get_comic(number: isize) -> Result<Value, ()> {
    let url = match number {
        0 => String::from("https://xkcd.com/info.0.json"),
        _ => format!("https://xkcd.com/{}/info.0.json", number),
    };

    let body = reqwest::get(url).await.unwrap();
    if body.status() != reqwest::StatusCode::OK {
        return Err(())
    }

    let returned_text = body.text().await.unwrap();

    let mut v: Value = serde_json::from_str(returned_text.as_str()).unwrap();

    let double_ext = "_2x";
    let extension_pos = v["img"].as_str().unwrap().rfind('.').unwrap();
    let mut double_url = v["img"].as_str().unwrap().to_string();
    double_url.insert_str(extension_pos, double_ext);

    if reqwest::get(&double_url).await.unwrap().status() == reqwest::StatusCode::OK {
        *v.get_mut("img").unwrap() = Value::String(double_url);
    }

    Ok(v)
}

#[tauri::command]
fn current_number(state: tauri::State<'_, ComicInfo>) -> Result<isize, ()> {
    let current = state.current.lock().unwrap();

    Ok(*current)
}

#[tauri::command]
async fn latest_comic(state: tauri::State<'_, ComicInfo>) -> Result<Value, ()> {
    let latest = *state.latest.lock().unwrap();

    let latest_comic = get_comic(latest).await?;

    Ok(latest_comic)
}

#[tauri::command]
async fn random_comic(state: tauri::State<'_, ComicInfo>) -> Result<Value, ()> {
    let current_value;
    {
        let mut rng = rand::thread_rng();
        let random_value = (rng.gen::<f64>() * state.latest.lock().unwrap().clone() as f64) as isize;
        let mut current = state.current.lock().unwrap();
        *current = random_value;

        current_value = current.clone();
    }

    let new_comic = get_comic(current_value).await?;

    Ok(new_comic)
}

#[tauri::command]
async fn step_comic(state: tauri::State<'_, ComicInfo>, step_by: isize) -> Result<Value, ()> {
    let current_value;
    {
        let mut current = state.current.lock().unwrap();
        *current += step_by;

        current_value = current.clone();
    }

    let new_comic = match get_comic(current_value).await {
        Ok(comic) => comic,
        Err(_) => return Err(())
    };

    Ok(new_comic)
}

#[tokio::main]
async fn main() {
    let latest = get_comic(0).await.unwrap()["num"].as_i64().unwrap();

    let new_info = ComicInfo {
        current: Mutex::new(latest as isize),
        latest: Mutex::new(latest as isize)
    };

    tauri::Builder::default()
        .manage(new_info)
        .invoke_handler(tauri::generate_handler![
            current_number,
            latest_comic,
            random_comic,
            step_comic
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
