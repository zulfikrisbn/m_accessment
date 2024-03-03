using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Assessment.Application.Common.Interfaces;

namespace Assessment.Application.Freelancers.Commands;
public class CheckUsernameCommand : IRequest<bool>
{
    public string? Username { get; set; }
}

public class CheckUsernameCommandHandler : IRequestHandler<CheckUsernameCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public CheckUsernameCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(CheckUsernameCommand request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(request.Username))
        {
            var entity = await _context.Freelancers
            .Where(x => request.Username.Equals(x.Username)).FirstOrDefaultAsync(cancellationToken);
        
            if (entity == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        return false;
    }
}
