package com.SeresP99.pollscape.recycleViews.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.SeresP99.pollscape.VoteActivity;
import com.SeresP99.pollscape.R;
import com.SeresP99.pollscape.authenticators.FingerprintAuthenticator;
import com.SeresP99.pollscape.recycleViews.models.VoteOptionModel;

import java.util.ArrayList;

public class VoteOption_RecyclerViewAdapter extends RecyclerView.Adapter<VoteOption_RecyclerViewAdapter.MyViewHolder> {

    Context context;
    ArrayList<VoteOptionModel> voteOptionModels;

    public VoteOption_RecyclerViewAdapter(Context context, ArrayList<VoteOptionModel> voteOptionModels) {
        this.context = context;
        this.voteOptionModels = voteOptionModels;
    }

    @NonNull
    @Override
    public VoteOption_RecyclerViewAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.vote_option_recyclerview_row, parent, false);
        return new VoteOption_RecyclerViewAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.button.setText(voteOptionModels.get(position).getTitle());
        holder.title = voteOptionModels.get(position).getTitle();
        holder.id = voteOptionModels.get(position).getId();
        holder.pollId = voteOptionModels.get(position).getPollId();
        holder.fingerprintRequired = voteOptionModels.get(position).getIsFingerprintRequired();
        holder.context = context;
    }

    @Override
    public int getItemCount() {
        return voteOptionModels.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        int pollId;
        int id;
        Button button;
        String title;
        Context context;
        boolean fingerprintRequired;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            button = itemView.findViewById(R.id.voteOptionButton);
            button.setText(title);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    if (fingerprintRequired) {
                        FingerprintAuthenticator fingerprintAuthenticator = new FingerprintAuthenticator(context, pollId, id);
                        fingerprintAuthenticator.authenticate();
                    } else {
                        Intent intent = new Intent(context, VoteActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        intent.putExtra("VOTE_OPTION_ID", id);
                        intent.putExtra("POLL_ID", pollId);
                        context.startActivity(intent);
                    }
                }
            });
        }
    }
}
