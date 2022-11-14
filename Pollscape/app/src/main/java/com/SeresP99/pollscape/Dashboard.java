package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.SeresP99.pollscape.recycleViews.adapters.DashboardButton_RecyclerViewAdapter;
import com.SeresP99.pollscape.recycleViews.adapters.VoteOption_RecyclerViewAdapter;
import com.SeresP99.pollscape.recycleViews.models.DashboardButtonModel;
import com.SeresP99.pollscape.recycleViews.models.VoteOptionModel;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Dashboard extends AppCompatActivity {

    String token;
    ArrayList<DashboardButtonModel> dashboardButtonModels = new ArrayList<DashboardButtonModel>();
    RecyclerView recyclerView;
    DashboardButton_RecyclerViewAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        token = sharedPreferences.getString("token", null);

        checkAuth(token);

        getButtons();
    }

    private void JumpToLogin() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

    public void logOut(View view) {
        RemoveToken();
        JumpToLogin();

    }

    private void RemoveToken() {
        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        SharedPreferences.Editor myEdit = sharedPreferences.edit();

        myEdit.remove("token");

        myEdit.apply();
    }

    private void checkAuth(String token) {
        RequestQueue queue = Volley.newRequestQueue(Dashboard.this);


        String url = "http://pollscape.ddns.net:4000/auth/checkAuth";
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> {
                    try {
                        if (!response.getBoolean("auth"))
                            JumpToLogin();
                    } catch (JSONException e) {
                        //Toast.makeText(Dashboard.this, e.toString(), Toast.LENGTH_LONG).show();
                    }
                },
                error -> {
                    //Toast.makeText(Dashboard.this, error.toString(), Toast.LENGTH_LONG).show();
                }) {
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("x-access-token", token);
                return params;
            }
        };
        queue.add(request);
    }

    private void updateRecyclerView() {
        recyclerView = findViewById(R.id.recycleView);
        adapter = new DashboardButton_RecyclerViewAdapter(this, dashboardButtonModels);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private void getButtons() {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://pollscape.ddns.net:4000/dashboard/getDashboardMenu";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> {
                    Log.i("REQUEST", "ERROR " + response.toString());

                    JSONObject responseObject;
                    try {
                        responseObject = new JSONObject(response.toString());
                        JSONArray buttonJsonArray = responseObject.getJSONArray("buttons");
                        for (int i = 0; i < buttonJsonArray.length(); i++) {
                            JSONObject buttonJson = buttonJsonArray.getJSONObject(i);
                            String title = buttonJson.getString("title");
                            String description = buttonJson.getString("description");
                            String URL = buttonJson.getString("url");
                            Log.i("MYNOTE", "title: " + title + " desc: " + description + " URL: " + URL);
                            dashboardButtonModels.add(new DashboardButtonModel(title, description, URL));
                        }
                        updateRecyclerView();
                    } catch (JSONException e) {
                        Log.i("REQUEST", "ERROR " + e);
                    }
                }, error -> Log.i("REQUEST", "ERROR " + error.toString())) {
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("x-access-token", token);
                return params;
            }
        };
        queue.add(request);

    }
}