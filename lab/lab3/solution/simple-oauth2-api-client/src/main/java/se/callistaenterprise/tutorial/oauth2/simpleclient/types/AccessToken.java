package se.callistaenterprise.tutorial.oauth2.simpleclient.types;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccessToken {

	@JsonProperty("access_token")
	private String accessToken;
	@JsonProperty("token_type")
	private String tokenType;
	@JsonProperty("expires_in")	
	private Integer expiresIn;
	@JsonProperty("scope")
	private String scope;
	@JsonProperty("issue_date")
	private Long issueDate;

	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getTokenType() {
		return tokenType;
	}
	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}
	public Integer getExpiresIn() {
		return expiresIn;
	}
	public void setExpiresIn(Integer expiresIn) {
		this.expiresIn = expiresIn;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public Long getIssueDate() {
		return issueDate;
	}
	public void setIssueDate(Long issueDate) {
		this.issueDate = issueDate;
	}
	
}
