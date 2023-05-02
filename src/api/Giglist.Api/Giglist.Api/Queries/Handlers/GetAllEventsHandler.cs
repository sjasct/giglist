﻿using Giglist.Api.Mappers;
using Giglist.Api.Models.Dto;
using Giglist.Api.Repositories.Interfaces;
using MediatR;

namespace Giglist.Api.Queries.Handlers;

public class GetAllEventsHandler : IRequestHandler<GetAllEventsQuery, IResult>
{
    private readonly IEventRepository _repo;
    private readonly IEventToDtoMapper _mapper;

    public GetAllEventsHandler(IEventRepository repo, IEventToDtoMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }
    
    public async Task<IResult> Handle(GetAllEventsQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.GetAllEvents();

        var dtos = result.Select(ev => _mapper.Map(ev));
        
        return Results.Ok(dtos);
    }
}