package com.example.plummy;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class loggedInMenu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logged_in_menu);

        Intent intent = getIntent();
        String username = intent.getStringExtra(LoginActivity.EXTRA_USERNAME);
        String password = intent.getStringExtra(LoginActivity.EXTRA_PASSWORD);

        TextView textView = findViewById(R.id.textView);
        textView.setText(username);

    }
}