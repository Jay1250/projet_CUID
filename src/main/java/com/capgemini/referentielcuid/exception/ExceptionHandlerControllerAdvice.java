package com.capgemini.referentielcuid.exception;

import java.util.NoSuchElementException;

import javax.persistence.RollbackException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice {

	private Logger logger = LoggerFactory.getLogger(MethodArgumentNotValidException.class);
	
	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleResourceNotFound(final NotFoundException exception,
			final HttpServletRequest request) {

		logger.error("----------- NOT FOUND EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage(exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(ConflictException.class)
	@ResponseStatus(value = HttpStatus.CONFLICT)
	public @ResponseBody ExceptionResponse handleResourceConflict(final ConflictException exception,
			final HttpServletRequest request) {

		logger.error("----------- CONFLICT EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage(exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody ExceptionResponse handleResourceBadRequest(final NoHandlerFoundException exception,
			final HttpServletRequest request) {

		logger.error("----------- NO HANDLER FOUND EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage("La requete http " + request.getRequestURI() + " est incorrect");
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody ExceptionResponse handleResourceBadRequest2(final MethodArgumentNotValidException exception,
			final HttpServletRequest request) {
		
		logger.error("----------- METHOD ARGUMENT NOT VALID EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage("Les arguments de la requete " + request.getRequestURI() + " sont invalides -> " + exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(RollbackException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody ExceptionResponse handleResourceRollback(final RollbackException exception,
			final HttpServletRequest request) {
		
		logger.error("----------- ROLLBACK EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage("Les arguments de la requete " + request.getRequestURI() + " sont invalides -> " + exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(MissingPathVariableException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody ExceptionResponse handleResourceMissingPathVariable(final MissingPathVariableException exception,
			final HttpServletRequest request) {
		
		logger.error("----------- MISSING PATH VARIABLE EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage("Requete " + request.getRequestURI() + " incorrect -> " + exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody ExceptionResponse handleResourceHttpRequestMethodNotSupported(final HttpRequestMethodNotSupportedException exception,
			final HttpServletRequest request) {
		
		logger.error("----------- HTTP REQUEST METHOD NOT SUPPORTED EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage("Requete " + request.getRequestURI() + " incorrect -> " + exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(NoSuchElementException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleResourceNoSuchElement(final NoSuchElementException exception,
			final HttpServletRequest request) {
		
		logger.error("----------- NO SUCH ELEMENT EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage("Ressource non trouvée -> " + exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
	
	@ExceptionHandler(CannotCreateTransactionException.class)
	@ResponseStatus(value = HttpStatus.GATEWAY_TIMEOUT)
	public @ResponseBody ExceptionResponse handleResourceNCannotCreateTransaction(final CannotCreateTransactionException exception,
			final HttpServletRequest request) {
		
		logger.error("----------- CANNOT CREATE TRANSACTION EXCEPTION -----------");
		logger.error(exception.getMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage("Transaction echouée -> " + exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody ExceptionResponse handleException(final Exception exception,
			final HttpServletRequest request) {

		logger.error("----------- " + exception.getClass() + " -----------");
		logger.error(exception.getMessage());
		logger.error(exception.getLocalizedMessage());
		
		ExceptionResponse error = new ExceptionResponse();
		error.setErrorMessage(exception.getMessage());
		error.callerURL(request.getRequestURI());
		return error;
	}
}
