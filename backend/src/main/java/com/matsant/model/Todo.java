package com.matsant.model;

import javax.persistence.*;

@Entity
@Table(name = "todo_mateusmsant")
public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "isDone")
	private boolean isDone;
	
	public Todo() {}
	
	public Todo(long id, String title, boolean isDone) {
		super();
		this.id = id;
		this.title = title;
		this.isDone = isDone;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public boolean isDone() {
		return isDone;
	}
	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}
	
	 
}
