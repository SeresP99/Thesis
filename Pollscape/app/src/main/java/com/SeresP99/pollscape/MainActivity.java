package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    public static final String EXTRA_USERNAME = "com.example.plummy.username";
    public static final String EXTRA_PASSWORD = "com.example.plummy.password";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        String token = sharedPreferences.getString("token", null);
        if (token != null)
            JumpToDashBoard();
    }

    public void buttonPress(View view) throws JSONException {
        EditText usernametb = (EditText) findViewById(R.id.username);
        EditText passwordtb = (EditText) findViewById(R.id.password);

        String username = usernametb.getText().toString();
        String password = passwordtb.getText().toString();

        PostLogin(username, password);
    }

    void PostLogin(String username, String password) throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(MainActivity.this);
        String url = "http://plummy.ddns.net:4000/login";

        JSONObject loginParams = new JSONObject();
        loginParams.put("username", username);
        loginParams.put("password", password);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, loginParams,
                response ->
                {
                    try {
                        if (response.getBoolean("auth")) {
                            Toast.makeText(MainActivity.this, "You are now logged in.", Toast.LENGTH_LONG).show();
                            SaveToken(response.getString("token"));
                            JumpToDashBoard();
                        } else
                            Toast.makeText(MainActivity.this, "Wrong credentials.", Toast.LENGTH_LONG).show();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                error -> Toast.makeText(MainActivity.this, error.toString(), Toast.LENGTH_LONG).show());

        queue.add(request);
    }

    void SaveToken(String token) {
        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        SharedPreferences.Editor myEdit = sharedPreferences.edit();

        myEdit.putString("token", token);

        myEdit.apply();
    }

    void JumpToDashBoard(){
        Intent intent = new Intent(this, Dashboard.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

}