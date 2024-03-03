
using Assessment.Application.Common.Models;
using Assessment.Application.Freelancers.Commands;
using Assessment.Application.Freelancers.Dto;
using Assessment.Application.Freelancers.Queries;

namespace Assessment.Web.Endpoints;

public class Freelancers : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetFreelancersWithPagination, nameof(GetFreelancersWithPagination))
            .MapGet(GetFreelance, nameof(GetFreelance))
            .MapPost(CreateFreelancer, nameof(CreateFreelancer))
            .MapPut(UpdateFreelancer, nameof(UpdateFreelancer))
            .MapPut(CheckUsername, nameof(CheckUsername))
            .MapDelete(DeleteFreelancer, nameof(DeleteFreelancer));
    }

    public Task<PaginatedList<FreelancerDto>> GetFreelancersWithPagination(ISender sender, [AsParameters] GetFreelancersWithPaginationQuery query)
    {
        return sender.Send(query);
    }

    public Task<FreelancerDto> GetFreelance(ISender sender, [AsParameters] GetFreelancerQuery query)
    {
        return sender.Send(query);
    }

    public Task<bool> CreateFreelancer(ISender sender, CreateFreelancerCommand command)
    {
        return sender.Send(command);
    }

    public async Task<IResult> UpdateFreelancer(ISender sender, UpdateFreelancerCommand command)
    {
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<bool> CheckUsername(ISender sender, CheckUsernameCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<IResult> DeleteFreelancer(ISender sender, int id)
    {
        await sender.Send(new DeleteFreelancerCommand(id));
        return Results.NoContent();
    }
}
