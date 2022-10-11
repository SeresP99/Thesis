package com.SeresP99.pollscape.recycleViews.adapters;

import android.content.Context;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.SeresP99.pollscape.R;
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
        holder.context = context;
    }

    @Override
    public int getItemCount() {
        return voteOptionModels.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder{

        int id;
        Button button;
        String title;
        Context context;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            button = itemView.findViewById(R.id.voteOptionButton);
            button.setText(title);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(context, "aztakurva" + id, Toast.LENGTH_SHORT).show();
                }
            });
        }
    }
}
