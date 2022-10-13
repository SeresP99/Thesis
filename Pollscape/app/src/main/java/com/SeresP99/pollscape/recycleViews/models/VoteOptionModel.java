package com.SeresP99.pollscape.recycleViews.models;

public class VoteOptionModel {

    String title;
    String description;
    int id;
    int pollId;
    boolean requiresFingerprint;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getId() {
        return id;
    }

    public int getPollId() {
        return pollId;
    }

    public boolean getIsFingerprintRequired() {
        return requiresFingerprint;
    }

    public VoteOptionModel(String title, String description, int id, int pollId, boolean requiresFingerprint) {
        this.title = title;
        this.description = description;
        this.id = id;
        this.pollId = pollId;
        this.requiresFingerprint = requiresFingerprint;
    }
}
