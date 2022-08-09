package com.example.plummy;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import android.content.Context;

import org.chromium.net.CronetEngine;
import org.chromium.net.CronetException;
import org.chromium.net.UrlRequest;
import org.chromium.net.UrlResponseInfo;

import java.nio.ByteBuffer;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import com.example.plummy.assets.MyUrlRequestCallBack;

public class LoginActivity extends AppCompatActivity {

    public static final String EXTRA_USERNAME = "com.example.plummy.username";
    public static final String EXTRA_PASSWORD = "com.example.plummy.password";

    Context context = getApplicationContext();

    CronetEngine.Builder myBuilder = new CronetEngine.Builder(context);
    CronetEngine cronetEngine = myBuilder.build();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }


    public void buttonPress(View view) {



        Toast.makeText(getApplicationContext(), "button was pressed", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(this, loggedInMenu.class);
        EditText usernametb = (EditText) findViewById(R.id.username);
        EditText passwordtb = (EditText) findViewById(R.id.password);

        String username = usernametb.getText().toString();
        String password = usernametb.getText().toString();

        intent.putExtra(EXTRA_USERNAME, username);
        intent.putExtra(EXTRA_PASSWORD, password);

        startActivity(intent);
    }
}



