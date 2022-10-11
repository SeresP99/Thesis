package com.SeresP99.pollscape;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.SeresP99.pollscape.recycleViews.adapters.VoteOption_RecyclerViewAdapter;
import com.SeresP99.pollscape.recycleViews.models.VoteOptionModel;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class VoteActivity extends AppCompatActivity {

    private ArrayList<VoteOptionModel> voteOptionModels = new ArrayList<>();
    Integer PollId;
    String token;
    VoteOption_RecyclerViewAdapter adapter;
    RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vote);

        Intent intent = getIntent();
        PollId = intent.getIntExtra("POLL_ID", -1);

        try {
            getVoteOptions();
        } catch (JSONException e) {
            Log.e("REQUEST", "ERROR " + e);
        }

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        token = sharedPreferences.getString("token", null);

        recyclerView = findViewById(R.id.voteOptionRecyclerView);
        adapter = new VoteOption_RecyclerViewAdapter(this, voteOptionModels);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private void setUpVoteOptions() {
        voteOptionModels.add(new VoteOptionModel("holy shit 1", "desc 1", 1));
        voteOptionModels.add(new VoteOptionModel("holy shit 2", "desc 2", 2));
        voteOptionModels.add(new VoteOptionModel("holy shit 3", "desc 3", 3));
        voteOptionModels.add(new VoteOptionModel("holy shit 4", "desc 4", 4));
        voteOptionModels.add(new VoteOptionModel("holy shit 5", "desc 5", 5));
    }

    private void updateRecyclerView() {
        recyclerView = findViewById(R.id.voteOptionRecyclerView);
        adapter = new VoteOption_RecyclerViewAdapter(this, voteOptionModels);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private void getVoteOptions() throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://pollscape.ddns.net:4000/voteOptions/getPollOptions";

        JSONObject pollId = new JSONObject();
        pollId.put("pollId", Integer.toString(PollId));

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, pollId,
                response -> {
                    Log.i("REQUEST", "ERROR " + response.toString());

                    JSONObject mainObject = null;
                    try {
                        mainObject = new JSONObject(response.toString());
                        JSONArray voteOptionArray = mainObject.getJSONArray("options");
                        for (int i = 0; i < voteOptionArray.length(); i++) {
                            JSONObject voteOption = voteOptionArray.getJSONObject(i);
                            String title = voteOption.getString("title");
                            String description = voteOption.getString("description");
                            int id = Integer.parseInt(voteOption.getString("id"));
                            Log.i("MYNOTE", "title: " + title + " desc: " + description + " id: " + id);
                            voteOptionModels.add(new VoteOptionModel(title, description, id));
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