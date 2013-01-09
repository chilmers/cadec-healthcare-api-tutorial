package se.callistaenterprise.tutorial.healthcare.app.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import se.callistaenterprise.tutorial.healthcare.app.backend.types.UserAccessToken;

public interface UserAccessTokenRepository extends JpaRepository<UserAccessToken, Long> {

    UserAccessToken findByUser(@Param("user") String user);
	
}
