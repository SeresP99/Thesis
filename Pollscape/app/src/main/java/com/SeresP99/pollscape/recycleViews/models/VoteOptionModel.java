package com.SeresP99.pollscape.recycleViews.models;

public class VoteOptionModel {

    String title;
    String description;
    int id;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getId() {
        return id;
    }

    public VoteOptionModel(String title, String description, int id) {
        this.title = title;
        this.description = description;
        this.id = id;
    }
}
