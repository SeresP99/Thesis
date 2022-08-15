package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

public class Dashboard extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        String token = sharedPreferences.getString("token", "token");

        TextView tokenLbl = (TextView) findViewById(R.id.tokenLabel);
        tokenLbl.setText(token);
        Toast.makeText(Dashboard.this, token, Toast.LENGTH_LONG).show();
    }
}